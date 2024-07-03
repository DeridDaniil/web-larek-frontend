// Интерфейс класса Component
export interface IComponent {
  setText(selector: string, text: string): void;
  setImage(selector: string, src: string): void;
  setClass(selector: string, className: string): void;
  render(): void;
}