export default class HexaglogPlayerSheet extends ActorSheet {

    static get defaultSheetPath() {
        return "systems/hexaglog/templates/sheets/actors/player-sheet.html"
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["hexaglog", "sheet", "actor"],
            template: HexaglogPlayerSheet.defaultSheetPath
        });
    }

    /** @override */
    get template() {
        return HexaglogPlayerSheet.defaultSheetPath
    }

    async activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // CharGen
        html.find('.generate-character').click(async (ev) => {this._generateAttributes(ev)});

        // Rollable abilities.
        html.find('.rollable').click(this._onRoll.bind(this));
    }

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        if (dataset.roll) {
            let roll = new Roll(dataset.roll, this.actor.data.data);
            let label = dataset.label ? `Rolling ${dataset.label}` : '';
            roll.roll().toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label
            });
        }
    }

    async _generateAttributes(ev) {
        let act = this.actor;

        // Generate Attribute Scores
        console.log("Character Generating: Attribute Scores")
        
        let attributes = duplicate(act.data.data.attributes);
        
        for (let [key, attribute] of Object.entries(attributes)) {
          let attributeRoll = new Roll("3d6dh2")
          attributeRoll.roll()
          
          //console.log(attributeRoll.result);
          attribute.value = Number(attributeRoll.result);
        }
        
        act.update({'data.attributes': attributes});
    }
}
