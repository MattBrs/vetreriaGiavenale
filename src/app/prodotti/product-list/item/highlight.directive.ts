import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Output() stateChanged = new EventEmitter<string>();
  @HostListener('mouseenter') over(){
    this.stateChanged.emit('hover');
  }
  @HostListener('mouseleave') left(){
    this.stateChanged.emit('normal');
  }

  constructor() { }

}
