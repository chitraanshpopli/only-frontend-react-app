import React from 'react';
import ReactDOM from 'react-dom';
import List from './../resources/js/list';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<List location={{state: undefined}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
