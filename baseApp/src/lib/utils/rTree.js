/**
 * @description rTree实例，存储全量路口路段数据，地图上选择范围后根据范围边界找出其中所有的路口路段
*/

import rbush from 'rbush'
import * as turf from '@turf/turf'
import _ from 'lodash'
import { judgeEmptyArr } from './util'

export class MyRBush extends rbush {
    toBBox(feature) {
        const xx = turf.bbox(feature)
        return {
            minX: xx[0],
            minY: xx[1],
            maxX: xx[2],
            maxY: xx[3]
        }
    }

    compareMinX(a, b) {
        return a.x - b.x
    }
    compareMinY(a, b) {
        return a.y - b.y
    }
}

// MyRBush实例
export const rTree = new MyRBush()

/**
 * @description 判断点和线是否在范围内
 * @param range 范围，一系列坐标点位
 * @param rTree 已经存储了全量点位和线段的rTree
 * @returns [] 范围内所有点线数据
*/
export const judgeRange = (range, rTree) => {
    // 通过turf的方法根据范围生成边界
    const lineString = turf.lineString(range)
    const bbox = turf.bbox(lineString)
    const obj = {
        minX: bbox[0],
        minY: bbox[1],
        maxX: bbox[2],
        maxY: bbox[3]
    }
    // 点集合生成多边形
    const poly = turf.polygon([range])
    // 多边形转化成线
    const rangeLine = turf.polygonToLine(poly)
    /**
     * 先从rTree中搜索出边界内所有点和线
     * 边界是根据最大最小经纬度生成，因此圆和多边形的边界也是矩形
     * 接下来遍历搜索出的结果，判断每个点是否在多边形内，每条线是否与多边形相交
     * 这里的圆不是真正的圆，只是边数比较多的正多边形，因此圆和多边形逻辑相同
     * */
    const possible = rTree.search(obj)
    const list = []
    possible.forEach(item => {
        const { type, coordinates } = item.geometry
        if (type === 'Point') {
            // 判断点是否在多边形内
            const pt = turf.point(coordinates)
            const flag = turf.booleanPointInPolygon(pt, poly)
            flag && list.push(item)
        } else if (type === 'LineString') {
            // 判断线段两端是否在多边形内
            const firstPt = turf.point(coordinates[0])
            const lastPt = turf.point(coordinates[coordinates.length - 1])
            // 线段两端只有有一个端点在多边形内即为相交
            const flag = turf.booleanPointInPolygon(firstPt, poly) || turf.booleanPointInPolygon(lastPt, poly)
            if (flag) {
                list.push(item)
            } else {
                // 线段两端都不在多边形内，判断线段是否与多边形相交，多边形可以转化成线，实际这里求两线段的交点
                const intersects = turf.lineIntersect(rangeLine, turf.lineString(coordinates))
                judgeEmptyArr(intersects.features) && list.push(item)
            }
        }
    })
    return _.cloneDeep(list)
}


