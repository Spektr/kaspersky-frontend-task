import { Component, EventEmitter, OnInit } from '@angular/core';
import {Control, ControlGroup, Validators} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'dynamic-list-component',
    inputs:['items', 'format', 'control'],
    outputs:['itemsChange'],
    styles:[`
        .dynamic-list-component{}
        .dynamic-list-component .form-control{
            float: left;
            margin-right: 5px;
            width: auto;
        }
    `],
    template: require('./dynamic-list.component.html')
})
export class DynamicListComponent<IItem> implements OnInit {

    groupControl:ControlGroup = new ControlGroup({});
    subControls:Control[] = [];
    format:{name:string,value:string}[] = [];

    items:IItem[]=[];
    itemsChange:EventEmitter<IItem[]> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        let self = this;

        // self.format.forEach((field, fieldIndex)=>{
        //     self.items.forEach((item, itemIndex)=>{
        //         self.groupControl.addControl(itemIndex+''+fieldIndex, new Control('', Validators.required));
        //     })
        // });

    }

    add(){
        let self = this,
            newItem = <IItem>{};

        self.format.forEach((field)=>{
            newItem[field.name]='';
        });

        self.items.push(newItem);
    }

    remove(item:IItem){
        let self = this;
        self.items.splice(self.items.indexOf(item),1);
    }

    get monitor(){
        return JSON.stringify(this.items);
    }
    
}