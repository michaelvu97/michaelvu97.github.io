/// <reference path="./jquery.d.ts"/>
$(() => {
    // Load json
    var client = new XMLHttpRequest();
    client.open('GET', 'http://michaelvu97.github.io/resume/resume-items.json');
    client.onload = () => { jsonReponse(client); };
    client.send();
});
function jsonReponse(client) {
    var response = JSON.parse(client.response);
    var tiles = response.tiles;
    var targetElement = $('tiles');
    tiles.forEach(tile => {
        targetElement.append(loadTile(tile));
    });
    styleElements();
}
function loadTile(tile) {
    var output = `
        <tile>
            <div class="tile-buffer">
                <div class="tile-content">
                    <div class="tile-title">Projects</div>
                    <div class="tile-body alt-font">`;
    var sectionName = tile.sectionName;
    tile.items.forEach(item => {
        output += loadItem(item);
    });
    output += `</div></div></div></tile>`;
    return output;
}
function loadItem(item) {
    var title = item.title;
    var notes = item.notes;
    var desc = item.itemDescription;
    var links = item.links;
    var output = `<div class="item">`;
    // Add title
    output += `<div class="item-title">${title}</div>`;
    // Add notes
    if (notes.length != 0) {
        output += `<div class="item-notes">`;
        notes.forEach(note => {
            output += `<span>${note}</span>`;
        });
        output += `</div>`;
    }
    // Add description
    output += `<div class="item-description">${desc}</div>`;
    if (links.length != 0) {
        output += `<div class="item-links">`;
        links.forEach(link => {
            output += `<a href="${link.url}">${link.name}</a>`;
        });
        output += `</div>`;
    }
    output += `</div>`;
    return output;
}
function styleElements() {
    $('.tile-body').children().last().addClass('last');
}
