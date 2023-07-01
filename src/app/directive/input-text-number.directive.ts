import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputTextNumber]'
})
export class InputTextNumberDirective {
  @Input('noWhiteSpace') noWhiteSpace: boolean = false;
  @Input('noSpaceInMiddle') noSpaceInMiddle: boolean = false;

  navigationKeys: Array<string> = ['Backspace']; //Add keys as per requirement

  constructor(private el: ElementRef, private formControl: NgControl) {}

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    let k = e.keyCode;
    let regex = /^[a-zA-Z0-9]+$/.test(e.key);

    if (
      this.navigationKeys.indexOf(e.key) > -1 ||
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return;
    }
    if (
      !((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || regex)     // Ensure that it is a number and stop the keypress
    ) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    let regex = /^[a-zA-Z0-9\s]+$/;     //anti ctrl+v with special
    const pastedData: any = event.clipboardData?.getData('text/plain');
    if (pastedData && !regex.test(pastedData)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event.target']) //no WhiteSpace
  onBlur(el: any) {
    if (this.noWhiteSpace == true && el.value !== '') {
      let trimValue =
        el.value == '' || null || undefined ? null : el.value.trim();
      if (this.noSpaceInMiddle == true) {
        trimValue = trimValue.split(/\s+/).join('');
      } else {
        trimValue = trimValue.split(/\s+/).join(' ');
      }
      this.el.nativeElement.value = trimValue; //update input field value
      this.formControl.control?.setValue(trimValue); //update FormControl value
    }
  }
}