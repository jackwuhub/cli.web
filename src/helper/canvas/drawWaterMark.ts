import { DrawWaterMark } from './@types/drawWaterMark'
import {getImage} from "../browser/image";

/**
 * 绘制水印
 * @param container
 * @param width
 * @param height
 * @param zIndex
 * @param waterImageSrc
 */
export const drawWaterMark:DrawWaterMark = ({
    container = document.body,
    width = 300,
    height = 300,
    zIndex = 1000,
    waterImageSrc = 'https://s6.bihukankan.com/img/0309water-market.png'
}) => {
    getImage(waterImageSrc).then((res:HTMLImageElement) => {
        const canvas:HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width
        canvas.height = height
        const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.globalAlpha = 1;
        ctx.drawImage(res, 0, 0, 200, 100);
        const base64Url = canvas.toDataURL();
        const watermarkDiv = document.createElement("div");
        watermarkDiv.setAttribute('style', `
          position:fixed;
          top:0;
          left: 0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`);
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
    })
}