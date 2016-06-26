import { Component, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import {Control, ControlGroup, Validators} from '@angular/common';

/**
 * Компонент для редактируемого списка
 *
 * Мета по сущности списка
 * @typedef FormatItem {
 *  @property {string} name            - название ключа айтемки
 *  @property {string} value           - описание ключа айтемки
 *  @property {ValidatorFn} validator  - фукнкция валидации значения
 * }
 *
 * @example {
 *  <dynamic-list-component
 *    [(items)]="items"
 *    [format]="[
 *       {name:'firstName', value:'Имя', validator:authorValidator},
 *       {name:'lastName', value:'Фамилия', validator:authorValidator}
 *    ]"
 *    [groupControl]="emptyControlsGroup"
 *  ></dynamic-list-component>
 *   param {Array<Object>} items         - список для редактирования
 *   param {Array<FormatItem>} format    - мета информация по сущностям списка
 *   param {ControlGroup} groupControl   - проброшенный внутрь списка контрол (для валидации родительской формы)
 * }
 *
 */
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

    // контрол для списка
    groupControl:ControlGroup = new ControlGroup({});

    // мета инфа по сущностям списка
    format:{
        name:string,
        value:string,
        validator:{(c:any):{[key:string]:any}}
    }[] = [];

    // массив сущностей
    items:IItem[]=[];
    // событие обновления списка
    itemsChange:EventEmitter<IItem[]> = new EventEmitter();

    /**
     * Хук на изменение
     * Переустанавливает контролы полям списка
     */
    ngOnChanges() {
        this.clearControls();
        this.addControls();
    }

    /**
     * Хук на дестракшн
     * Сбрасывает контролы
     */
    ngOnDestroy(){
        this.clearControls();
    }

    /**
     * Добавление нового элемента в список
     */
    add():void{
        let self = this,
            newItem = <IItem>{};

        // заполняем инстанс пустыми свойствами
        self.format.forEach((field)=>{
            newItem[field.name]='';
        });

        self.items.push(newItem);
        self.ngOnChanges();
    }

    /**
     * Удаление элемента из списка
     *
     * @param {IItem} item  - элемент для удаления
     */
    remove(item:IItem):void{
        let self = this,
            itemIndex = self.items.indexOf(item);

        self.items.splice(itemIndex, 1);
        self.ngOnChanges();
    }

    /**
     * Навешивание контролов на элементы списка (для валидации)
     * Для прохода по всем полям используем вложенные цыклы
     */
    addControls():void{
        let self = this;

        // проходим по формату и элементам списка
        self.format.forEach((field, fieldIndex)=>{
            self.items.forEach((item, itemIndex)=>{

                // создаем контрол
                let validator =  field.validator,
                    control = new Control('', validator);

                // привязываем контрол с элементом
                control.updateValue(item[field.name],{
                    emitEvent: true,
                    emitModelToViewChange: true
                });

                // добавляем контрол в общую коллекцию родительской формы
                self.groupControl.addControl(self.generateName([itemIndex, fieldIndex]), control);
            })
        });

        // пробрасываем событие обновления наверх
        self.groupControl.updateValueAndValidity({emitEvent: true});
    }

    /**
     * Удаление всех контролов
     */
    clearControls(){
        let self = this;

        self.groupControl.controls = {};
        self.groupControl.updateValueAndValidity({emitEvent: true});
    }

    /**
     * Генерация имени по ключам
     *
     * @param {Array(string|number)} keys   - ключи для склейки
     * @returns {string}                    - оригинальное имя
     */
    generateName(keys:(string|number)[]):string{
        return 'control'+keys.join('');
    }

}