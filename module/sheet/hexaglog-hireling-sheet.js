export default class HexaglogHirelingSheet extends ActorSheet {
    get template() {
        return `${hexaglog.defaultSheetPath}/actors/${this.actor.data.type}-sheet.html`
    }
}