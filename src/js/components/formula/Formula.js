import { ExcelComponent } from "@core/ExcelComponent.js";
import { $ } from "@core/DOM";

export class Formula extends ExcelComponent {
  static className = "formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      subscribe: ["currentText"],
      ...options
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.querySelector("[data-type='formulaInput']");

    this.$on("Table:CellSelect", $cell => {
      this.$formula.text($cell.dataset.value);
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  toHTML() {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable="true" spellcheck="false" data-type="formulaInput"></div>
    `;
  }

  onInput(event) {
    this.$emit("Formula:Input", $(event.target).text());
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      this.$emit("Formula:Enter", null);
    }
  }
}
