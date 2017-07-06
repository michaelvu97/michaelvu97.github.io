/// <reference path="./jquery.d.ts"/>

interface Tile {
    sectionName: string,
    color?: string,
    items: Array<Item>
}

interface Item {
    title: string,
    notes: Array<string>,
    itemDescription: string,
    links: Array<Link>
}

interface Link {
    name: string,
    url: string
}

$(() => {

    // Load json
    var client = new XMLHttpRequest();
    client.open('GET', 'http://michaelvu97.github.io/resume/resume-items.json');
    client.onload = () => {jsonReponse(client)};
    client.send();

});

function jsonReponse(client: XMLHttpRequest) {
    var response = JSON.parse(client.response);
    var tiles = response.tiles;

    var targetElement = $('tiles');

    tiles.forEach(tile => {
        targetElement.append(loadTile(tile));
    });

    styleElements();

}

function loadTile(tile: Tile): string {

    var output = `
        <tile>
            <div class="tile-buffer">
                <div class="tile-content" style="background-color:${tile.color}">
                    <div class="tile-title">${tile.sectionName}</div>
                    <div class="tile-body alt-font">`;

    tile.items.forEach(item => {
        output +=  loadItem(item);
    });

    output += `</div></div></div></tile>`;

    return output;
}

function loadItem(item: Item): string {
    var title = item.title;
    var notes = item.notes;
    var desc = item.itemDescription;
    var links = item.links;

    var output = `<div class="item">`;
    
    // Add title
    output += `<div class="item-title">${title}</div>`;    

    // Add notes
    if (notes.length != 0) {

        output += `<div class="item-notes">`

        notes.forEach(note => {
            output += `<span class="hover-float">${note}</span>`
        });

        output += `</div>`;

    }

    // Add description
    output += `<div class="item-description">${desc.replace('\n','<br>')}</div>`;

    if (links.length != 0) {
        output += `<div class="item-links">`;
        links.forEach(link => {
            output += `<a class="hover-float" href="${link.url}">${link.name}</a>`
        })
        output += `</div>`;
    }

    output += `</div>`;

    return output;

}

function styleElements(): void {
    var tiles = $('tile');

    tiles.each((i, tile) => {
        $(tile).children().children().children('.tile-body').children().last().addClass('last');
    });

    $('.tiles-buffer').scroll(function () {

        console.log($('tiles').scrollTop() == 0);
        if ($('.tiles-buffer').scrollTop() == 0)
            $('header').css("box-shadow", "0px 0px 0px rgba(0,0,0,0.3), 0px 0px 0px 0px rgba(0,0,0,0.6)");
        else 
            $('header').css("box-shadow", "rgba(0, 0, 0, 0.1) 0px 0px 1px 1px, rgba(0, 0, 0, 0.2) 0px 6px 7px 0px");
    });

}
