export class TableSelection {
    constructor(className) {
        this.group = [];
        this.className = className;
    }

    select(table, $el) {
        this.clearSelection();
        this.group.push($el);
        $el.focus().classList.add(this.className);
        table.emitter.emit("TableCellSelect", $el.text());
    }

    selectGroup(table, $from, $to) {
        const fromCoords = $from.id(true);
        const toCoords = $to.id(true);

        for (let col = Math.min(fromCoords.col, toCoords.col); col <= Math.max(fromCoords.col, toCoords.col); col++) {
            for (let row = Math.min(fromCoords.row, toCoords.row); row <= Math.max(fromCoords.row, toCoords.row); row++) {
                const $cell = table.getCell(col, row);
                if (this.group[0].$el !== $cell.$el) {
                    $cell.classList.add(this.className);
                    this.group.push($cell);
                }
            }
        }
    }

    clearSelection() {
        this.group.forEach($item => $item.classList.remove(this.className));
        this.group = [];
    }
}
