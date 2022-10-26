// Copyright (c) me
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

import React from 'react';
import * as ReactDOM from 'react-dom';

// Import the CSS
import '../css/widget.css';

const e = React.createElement;

export class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
      value: 'Hello World',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class ExampleView extends DOMWidgetView {
  initialize() {
    const backbone = this;

    class Example extends React.Component<{}, {value: string}> {
      constructor(props: any) {
        super(props);
        this.state = {
          value: backbone.model.get("value")
        };
      }

      onChange(model: any) {
        this.setState(model.changed);
      }

      componentDidMount() {
        backbone.listenTo(backbone.model, "change", this.onChange.bind(this));
      }

      render() {
        return e("h1", {}, `Hello ${this.state.value}`);
      }
    }
    const $app = document.createElement("div");
    const App = e(Example);
    ReactDOM.render(App, $app);

    backbone.el.append($app);
  }
}
