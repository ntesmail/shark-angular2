import { Component } from '@angular/core';

@Component({
    selector: 'tooltip-demo',
    templateUrl: '/shark-angular2/components/tooltip.html'
})
export class TooltipComponent {
    tooltipContent = '<div style="color:#ff0000;">电话号码：18699998888<br/>家庭住址：杭州市滨江区网商路599号</div>'
};
