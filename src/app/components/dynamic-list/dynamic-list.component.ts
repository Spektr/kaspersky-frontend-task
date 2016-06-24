import { Component, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import {Control, ControlGroup, Validators} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'dynamic-list-component',
    inputs:['items', 'format', 'groupControl'],
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
export class DynamicListComponent<IItem> implements OnChanges, OnDestroy {

    groupControl:ControlGroup = new ControlGroup({});

    format:{
        name:string,
        value:string,
        validator:{(c:any):{[key:string]:any}}
    }[] = [];

    items:IItem[]=[];
    itemsChange:EventEmitter<IItem[]> = new EventEmitter();

    constructor() { }

    ngOnChanges() {
        this.clearControls();
        this.addControls();
    }

    ngOnDestroy(){
        this.clearControls();
    }

    add(){
        let self = this,
            newItem = <IItem>{};

        self.format.forEach((field)=>{
            newItem[field.name]='';
        });

        self.items.push(newItem);
        self.ngOnChanges();
    }

    remove(item:IItem){
        let self = this,
            itemIndex = self.items.indexOf(item);

        self.items.splice(itemIndex, 1);
        self.ngOnChanges();
    }

    addControls(){
        let self = this;

        self.format.forEach((field, fieldIndex)=>{
            self.items.forEach((item, itemIndex)=>{
                let validator =  field.validator,
                    control = new Control('', validator);

                control.updateValue(item[field.name],{
                    emitEvent: true,
                    emitModelToViewChange: true
                });

                self.groupControl.addControl(self.generateName([itemIndex, fieldIndex]), control);
            })
        });

        self.groupControl.updateValueAndValidity({emitEvent: true});
    }

    clearControls(){
        let self = this;

        self.groupControl.controls = {};
        self.groupControl.updateValueAndValidity({emitEvent: true});
    }

    generateName(keys:(string|number)[]):string{
        return 'control'+keys.join('');
    }

}