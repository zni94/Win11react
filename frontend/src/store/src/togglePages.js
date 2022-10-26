import SNSWindow from '../../components/windows/SNSWindow';
import IDEWindow from '../../components/windows/IDEWindow';
import DocumentWindow from '../../components/windows/DocumentWindow';

export const OPEN = 'OPEN/PAGE';
export const CLOSE = 'CLOSE/PAGE';
export const CHANGE = 'CHANGE/PATH';

export const openPage = (pageName) => ({
  type: OPEN,
  pageName,
});
export const closePage = (pageName) => ({
  type: CLOSE,
  pageName,
});
export const changePath = (pageName, path) => ({
  type: CHANGE,
  pageName,
  path,
});

const initialState = {
  sns: {
    isBool: false,
    path: ['C:', 'background', 'sns'],
    component: <SNSWindow key={0} target={'sns'} />,
  },
  ide: {
    isBool: false,
    path: ['C:', 'background', 'ide'],
    component: <IDEWindow key={1} target={'ide'} />,
  },
  document: {
    isBool: false,
    path: ['C:', 'background', 'document'],
    component: <DocumentWindow key={2} target={'document'} />,
  },
};

const togglePages = (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      const open_obj = returnState(action.pageName, 'OPEN');
      return {
        ...state,
        sns: open_obj.sns,
        ide: open_obj.ide,
        document: open_obj.document,
      };
    case CLOSE:
      const close_obj = returnState(action.pageName, 'CLOSE');
      return {
        ...state,
        sns: close_obj.sns,
        ide: close_obj.ide,
        document: close_obj.document,
      };
    case CHANGE:
      const change_path = returnPath(action.pageName, action.path);
      return {
        ...state,
        sns: change_path.sns,
        ide: change_path.ide,
        document: change_path.document,
      };
    default:
      return state;
  }
};

const returnState = (pageName, type) => {
  const state = initialState;
  const keys = Object.keys(initialState);

  switch (type) {
    case 'OPEN':
      keys.forEach((key) => {
        if (key === pageName) state[key].isBool = true;
      });
      break;
    case 'CLOSE':
      keys.forEach((key) => {
        if (key === pageName) state[key].isBool = false;
      });
      break;
    default:
      break;
  }

  return state;
};

const returnPath = (pageName, path) => {
  const state = initialState;
  const keys = Object.keys(initialState);

  keys.forEach((key) => {
    if (key === pageName) state[key].path = path;
  });

  return state;
};

export default togglePages;