import React from 'react';
import {Link} from 'react-router';

import Loading from 'client/components/common/loading';

export default (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>文章分类</h1>
          {
            props.categories.length > 0 ?
              props.categories.map((category, index) =>
                <p key={index}>{category} <Link to="#" onClick={(e) => props.deleteCategory(category, e)}>删除</Link></p>
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
          <h4>菜单位置</h4>
          <form onChange={props.changeTabsPosition}>
            <div className="form-group">
              <input type="radio" name="catePosition" id="radio1" value="top" checked={props.position === 'top'} />
              <label htmlFor="radio1">
                顶端
              </label>
            </div>
            <div className="form-group">
              <input type="radio" name="catePosition" id="radio2" value="bottom" checked={props.position === 'bottom'} />
              <label htmlFor="radio2">
                底端
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h4>菜单颜色</h4>
          <form>
            <select value={props.tabsColor} onChange={props.changeTabsColor} className="form-control" name="color">
              <option value="green">绿色</option>
              <option value="red">红色</option>
              <option value="black">黑色</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}
