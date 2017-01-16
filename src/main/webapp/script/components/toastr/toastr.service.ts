import { Injectable } from '@angular/core';


@Injectable()
export class SharkToastrService {

    public constructor() { }

    //成功提示
    public success(content: string) {
        $.fn.sharkToastr({
            type: 'success',
            content: content,
            duration: 3000
        });
    }

    //失败提示
    public error(content: string) {
        $.fn.sharkToastr({
            type: 'error',
            content: content,
            duration: 3000
        });
    }

}
