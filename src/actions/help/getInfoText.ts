// \n
// "!action beispiel" >> startet die Aktion mit Namen "Beispiel"\n
// \n
// "!list" >> listet alle Befehle auf\n
export const getInfoText = async (msg: string) => `
Hallo ich bin Knut der Bot!\n
Die wichtigsten Befehle lauten: (Ohne Anführungszeichen)\n
"!Bot Irgendetwas" >> Frag mich nach Irgendetwas\n
"!Knut Irgendetwas" >> Frag mich nach Irgendetwas\n
"!help" >> Öffnet diese Hilfsübersicht\n
`;
