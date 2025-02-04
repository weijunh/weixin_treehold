import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { canIUseFormFieldButton } from '../common/version';
const mixins = [button, openType];
if (canIUseFormFieldButton()) {
    mixins.push('wx://form-field-button');
}
VantComponent({
    mixins,
    classes: ['hover-class', 'loading-class'],
    data: {
        baseStyle: '',
    },
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            value: 'van-icon',
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: 'circular',
        },
        type: {
            type: String,
            value: 'default',
        },
        dataset: null,
        size: {
            type: String,
            value: 'normal',
        },
        loadingSize: {
            type: String,
            value: '20px',
        },
        color: {
            type: String,
            observer(color) {
                let style = '';
                if (color) {
                    style += `color: ${this.data.plain ? color : 'white'};`;
                    if (!this.data.plain) {
                        // Use background instead of backgroundColor to make linear-gradient work
                        style += `background: ${color};`;
                    }
                    // hide border when color is linear-gradient
                    if (color.indexOf('gradient') !== -1) {
                        style += 'border: 0;';
                    }
                    else {
                        style += `border-color: ${color};`;
                    }
                }
                if (style !== this.data.baseStyle) {
                    this.setData({ baseStyle: style });
                }
            },
        },
    },
    methods: {
        onClick() {
            if (!this.data.loading) {
                this.$emit('click');
            }
        },
        noop() { },
    },
});
