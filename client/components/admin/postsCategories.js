import React from 'react';
import {Link} from 'react-router';

import Loading from 'client/components/common/loading';

export default (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>Posts categories</h1>
          {
            props.categories.length > 0 ?
              props.categories.map((category, index) =>
                <p key={index}>{category} <Link to="#" onClick={(e) => props.deleteCategory(category, e)}>Delete</Link></p>
              ) :
              <Loading />
          }
          <form onSubmit={props.addCategory}>
            <div className="input-group">
              <input className="form-control" type="text" name="category" />
              <span className="input-group-btn">
            <button className="btn btn-default" type="submit">添加分类</button>
          </span>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h4>Category Position</h4>
          <form onChange={props.changeTabsPosition}>
            <div className="form-group">
              <input type="radio" name="catePosition" id="radio1" value="top" checked={props.position === 'top'} />
              <label htmlFor="radio1">
                Top
              </label>
            </div>
            <div className="form-group">
              <input type="radio" name="catePosition" id="radio2" value="bottom" checked={props.position === 'bottom'} />
              <label htmlFor="radio2">
                Bottom
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
