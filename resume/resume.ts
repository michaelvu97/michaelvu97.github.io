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

    // var output = `
    //     <tile>
    //         <div class="tile-buffer">
    //             <div class="tile-content" style="background-color:${tile.color}">
    //                 <div class="tile-title">${tile.sectionName}</div>
    //                 <div class="tile-body alt-font">`;
    var output = `
        <tile>
            <div class="tile-buffer">
                <div class="tile-content">
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

        var scrollTop = $('.tiles-buffer').scrollTop();
        if (scrollTop == 0)
            $('header').css("box-shadow", "0px 0px 0px rgba(0,0,0,0.3), 0px 0px 0px 0px rgba(0,0,0,0.6)");
        else 
            $('header').css("box-shadow", "rgba(0, 0, 0, 0.1) 0px 0px 1px 1px, rgba(0, 0, 0, 0.2) 0px 6px 7px 0px");

        var maxScrollTop = $('tiles').height() - ($('.content-container').height() - $('header').height());

        var percentScrolled = scrollTop / maxScrollTop;
        if (percentScrolled < 0)
            percentScrolled = 0;
        if (percentScrolled > 1)
            percentScrolled = 1;

        var base = [254, 231, 231];
        var target = [217, 246, 238];

        var color = transitionColor(base,target,percentScrolled);
        console.log(color);
        $('.tiles-buffer').css("background-color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);

    });

    var randColor = HSLToRGB(Math.random(), 0.9, 0.95);
    console.log(randColor);
    // $('.tiles-buffer').css("background-color", `rgb(${randColor[0]}, ${randColor[1]}, ${randColor[2]})`);

}

function transitionColor(base: Array<number>, target: Array<number>, 
        percent:number): Array<number> {
    var output = [];
    for (var i = 0; i < base.length; i++) {
        output.push(Math.floor(base[i] + (target[i] - base[i]) * percent));
    }
    return output;
}

function HSLToRGB(hue:number, sat:number, lightness:number) {
    var r: number, g: number, b: number;

    if (sat == 0) {

        r = g = b = lightness;

    } else {

        var hueToRGB = (p: number, q:number, t:number) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = 1 < 0.5 ? lightness * (1 + sat) : lightness + sat - lightness * sat;
        var p = 2 * lightness - q;
        r = hueToRGB(p, q, hue + 1/3);
        g = hueToRGB(p, q, hue);
        b = hueToRGB(p, q, hue - 1/3);
        
    }

    return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}