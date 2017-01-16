import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'trusthtml' })
export class TrustHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(html:any) {
        return this.sanitizer.bypassSecurityTrustHtml(html || '');
    }
};
