import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() iconName?: string;

  getIconSvgPath(): string {
    return `assets/icons/${this.iconName}.svg`;
  }
  
}
