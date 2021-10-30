const videoGamesSalesURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
// const videoGamesSalesURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

let videoGamesData

let canvas = d3.select('#canvas')

function drawTreeMap() {

    let hierarchy = d3.hierarchy(videoGamesData, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value'] - node1['value'] 
    })

    // method that creates a tree map from any hierarchy fed to it
    let createTreeMap = d3.treemap()
                            .size([1200, 800])

    createTreeMap(hierarchy)
    
    let gamesTiles = hierarchy.leaves()

    console.log(hierarchy.leaves())

    let block = canvas.selectAll('g')
            .data(gamesTiles)
            .enter()
            .append('g')
            .attr('transform', (game) => {
                return 'translate(' + game['x0'] + ', ' + game['y0'] + ')'
            })

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (game) => {
            let category = game['data']['category']

            if(category === 'Wii') {
                return '#8AE0FF'
            } else if (category === 'GB') {
                return '#E8DAEF'
            } else if (category === 'PS2') {
                return '#F5B7B1'
            } else if (category === 'SNES') {
                return '#E38AFF'
            } else if (category === 'GBA') {
                return '#EAE4E7'
            } else if (category === '2600') {
                return '#F9E79F'
            } else if (category === 'DS') {
                return '#F9E79F'
            } else if (category === 'PS3') {
                return '#17A589'
            } else if (category === '3DS') {
                return '#F08080'
            } else if (category === 'PS') {
                return '#FCB7DE'
            } else if (category === 'XB') {
                return '#ADDCFB'
            } else if (category === 'PSP') {
                return '#60FCD2'
            } else if (category === 'X360') {
                return '#82E0AA'
            } else if (category === 'NES') {
                return '#F5B041' 
            } else if (category === 'PS4') {
                return '#E9FF8A'
            } else if (category === 'N64') {
                return '#FCD5B7'
            } else if (category === 'PC') {
                return 'Darkgrey'
            } else if (category === 'XOne') {
                return 'Lightblue'
            } 
        })
        .attr('data-name', (game) => {
            return game['data']['name']
        })
        .attr('data-category', (game) => {
            return game['data']['category']
        })
        .attr('data-value', (game) => {
            return game['data']['value']
        })
        .attr('width', (game) => {
            return game['x1'] - game['x0']
        })
        .attr('height', (game) => {
            return game['y1'] - game['y0']
        })

    block.append('text')
        // .text((game) => {
        //     return game['data']['name']
        // })
        // .attr('x', 5)
        // .attr('y', 10)
        .selectAll('tspan')
      .data(function (game) {
        return game.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append('tspan')
      .attr('x', 4)
      .attr('y', function (d, i) {
        return 13 + i * 10;
      })
      .text(function (d) {
        return d;
      });
        
}

//fetching the data
d3.json(videoGamesSalesURL).then(
    (data, error) => {
        if(error) {
            console.log(log)
        } else {
            videoGamesData = data
            // console.log(videoGamesData)
            drawTreeMap()
        }
    }
)