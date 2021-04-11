export default class HexaglogItemSheet extends ItemSheet {
    get template() {
        return `${hexaglog.defaultSheetPath}/items/${this.item.data.type}-sheet.html`
    }
}