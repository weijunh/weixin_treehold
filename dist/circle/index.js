import { VantComponent } from '../common/component';
import { isObj } from '../common/utils';
import { BLUE, WHITE } from '../common/color';
import { adaptor } from './canvas';
function format(rate) {
    return Math.min(Math.max(rate, 0), 100);
}
const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;
VantComponent({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: 'round',
        },
        value: {
            type: Number,
            value: 0,
            observer: 'reRender',
        },
        speed: {
            type: Number,
            value: 50,
        },
        size: {
            type: Number,
            value: 100,
            observer() {
                this.drawCircle(this.currentValue);
            },
        },
        fill: String,
        layerColor: {
            type: String,
            value: WHITE,
        },
        color: {
            type: [String, Object],
            value: BLUE,
            observer: 'setHoverColor',
        },
        type: {
            type: String,
            value: '',
        },
        strokeWidth: {
            type: Number,
            value: 4,
        },
        clockwise: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        hoverColor: BLUE,
    },
    methods: {
        getContext() {
            const { type } = this.data;
            if (type === '') {
                const ctx = wx.createCanvasContext('van-circle', this);
                return Promise.resolve(ctx);
            }
            const dpr = wx.getSystemInfoSync().pixelRatio;
            return new Promise((resolve) => {
                wx.createSelectorQuery()
                    .in(this)
                    .select('#van-circle')
                    .fields({ node: true, size: true })
                    .exec((res) => {
                    const canvas = res[0].node;
                    const ctx = canvas.getContext(type);
                    canvas.width = res[0].width * dpr;
                    canvas.height = res[0].height * dpr;
                    ctx.scale(dpr, dpr);
                    resolve(adaptor(ctx));
                });
            });
        },
        setHoverColor() {
            const { color, size } = this.data;
            let hoverColor = color;
            this.getContext().then((context) => {
                if (isObj(color)) {
                    const LinearColor = context.createLinearGradient(size, 0, 0, 0);
                    Object.keys(color)
                        .sort((a, b) => parseFloat(a) - parseFloat(b))
                        .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, color[key]));
                    hoverColor = LinearColor;
                }
                this.setData({ hoverColor });
            });
        },
        presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
            const { strokeWidth, lineCap, clockwise, size, type } = this.data;
            const position = size / 2;
            const radius = position - strokeWidth / 2;
            context.setStrokeStyle(strokeStyle);
            context.setLineWidth(strokeWidth);
            context.setLineCap(lineCap);
            context.beginPath();
            context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
            context.stroke();
            if (fill) {
                context.setFillStyle(fill);
                context.fill();
            }
        },
        renderLayerCircle(context) {
            const { layerColor, fill } = this.data;
            this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
        },
        renderHoverCircle(context, formatValue) {
            const { clockwise, hoverColor } = this.data;
            // 结束角度
            const progress = PERIMETER * (formatValue / 100);
            const endAngle = clockwise
                ? BEGIN_ANGLE + progress
                : 3 * Math.PI - (BEGIN_ANGLE + progress);
            this.presetCanvas(context, hoverColor, BEGIN_ANGLE, endAngle);
        },
        drawCircle(currentValue) {
            const { size } = this.data;
            this.getContext().then((context) => {
                context.clearRect(0, 0, size, size);
                this.renderLayerCircle(context);
                const formatValue = format(currentValue);
                if (formatValue !== 0) {
                    this.renderHoverCircle(context, formatValue);
                }
                context.draw();
            });
        },
        reRender() {
            // tofector 动画暂时没有想到好的解决方案
            const { value, speed } = this.data;
            if (speed <= 0 || speed > 1000) {
                this.drawCircle(value);
                return;
            }
            this.clearInterval();
            this.currentValue = this.currentValue || 0;
            this.interval = setInterval(() => {
                if (this.currentValue !== value) {
                    if (this.currentValue < value) {
                        this.currentValue += STEP;
                    }
                    else {
                        this.currentValue -= STEP;
                    }
                    this.drawCircle(this.currentValue);
                }
                else {
                    this.clearInterval();
                }
            }, 1000 / speed);
        },
        clearInterval() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        },
    },
    created() {
        const { value } = this.data;
        this.currentValue = value;
        this.drawCircle(value);
    },
    destroyed() {
        this.clearInterval();
    },
});
