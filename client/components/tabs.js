import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <div className={`posts-tab ${this.props.position}`}>
        <ul className="flex-container">
          {
            this.props.configs ?
              this.props.configs.categories.map((cate, i) =>
                <li key={i} onClick={(e) => this.props.changeCate(e, cate)} className="flex-item">{cate}</li>
              ) :
              <div />
          }
        </ul>
      </div>
    );
  }
}
