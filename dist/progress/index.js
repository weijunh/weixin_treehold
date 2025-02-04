import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
VantComponent({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        trackColor: String,
        showPivot: {
            type: Boolean,
            value: true,
        },
        color: {
            type: String,
            value: BLUE,
        },
        textColor: {
            type: String,
            value: '#fff',
        },
        strokeWidth: {
            type: null,
            value: 4,
        },
    },
});
