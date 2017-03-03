import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'autocomplete-demo',
    templateUrl: '/shark-angular2/components/autocomplete.html'
})
export class AutocompleteComponent {
    email = '';
    filterData(value, config) {
        let arr = ['163.com', '126.com', 'vip.163.com', 'vip.126.com', 'gmail.com', 'vip.gmail.com', 'qq.com', 'yeah.net', 'sina.com'];
        var list = [];
        if (value.indexOf('@') > -1) {
            var email = value.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].indexOf(email[1]) > -1) {
                    list.push({
                        name: email[0] + '@' + arr[i]
                    });
                }
            }
        } else {
            for (var i = 0; i < arr.length; i++) {
                list.push({
                    name: value + '@' + arr[i]
                });
            }
        }
        return list;
    }

    onSelected(evt) {
        console.log(this.email);
        console.log(evt);
    }

};
