import { AfterViewInit, Component } from "@angular/core"
import { Game, mockDevelopers$, mockGames$ } from "@utils/mockData"
import { ActivatedRoute, Router, RouterLink } from "@angular/router"
import { GameCardComponent } from "../games/game-card/game-card.component"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import ForceGraph, { LinkObject, NodeObject } from "force-graph"
import { combineLatest } from "rxjs"
import { MatCardTitle } from "@angular/material/card";


interface GraphNode {
  id: number;
  label: string;
}

interface GraphLink {
  source: number;
  target: number;
  gameName: string;
}

interface ForceGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}


@Component({
  selector: 'app-dashboard',
  imports: [GameCardComponent, MatToolbarModule, MatButtonModule, MatCardTitle, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  games: Game[] = [];
  mostPlayedNGames: Game[] = [];
  mostPlayedNGamesAmount: number = 3;

  gameAmount: number = 0;
  developerAmount: number = 0;
  avgDevelopersPerGame: number = 0;

  graph!: ForceGraph;
  graphData: ForceGraphData = { nodes: [], links: [] };


  highlightNode: (NodeObject | null) = null;
  highlightLink: (LinkObject<NodeObject> | null) = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    mockGames$.subscribe(
      (x) => {
        this.games = x;
        this.mostPlayedNGames = [...x].sort((a, b) => b.numPlayers - a.numPlayers).slice(0, this.mostPlayedNGamesAmount);
      }

    )

    mockGames$.subscribe(
      (x) => this.gameAmount = x.length
    )

    mockDevelopers$.subscribe(
      (x) => this.developerAmount = x.length
    )

    mockGames$.subscribe(
      (x) => this.avgDevelopersPerGame = x.reduce((prev, game) => prev + game.developers.length, 0.0) / x.length
    )


    combineLatest([mockGames$, mockDevelopers$]).subscribe(([mockGames, mockDevelopers]) => {
      const nodes = mockDevelopers.map((dev, index) => ({ id: index, label: dev.name }))

      const links = mockGames.flatMap((game) =>
        game.developers.flatMap((dev, i) =>
          game.developers.slice(i + 1).map((dev2): GraphLink => (
            {
              source: dev,
              target: dev2,
              gameName: game.name
            }
          ))
        )
      );

      this.graphData = { nodes: nodes, links: links };
      this.updateGraph()
    })

  }
  ngAfterViewInit(): void {
    const element = document.getElementById("headline");
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
    this.createGraph();
  }

  createGraph() {

    //https://github.com/vasturiano/force-graph/blob/master/example/highlight/index.html

    this.graph = new ForceGraph(document.getElementById("developer-graph")!)
      .backgroundColor('#F5F5FF')
      .height(window.innerHeight / 2)
      .width(window.innerWidth / 2)
      .graphData(this.graphData)
      .nodeId("id")
      .nodeAutoColorBy("group")
      .autoPauseRedraw(false)
      .onLinkHover(link => {
        this.highlightLink = null
        if (link) {
          this.highlightLink = link
        }
      })
      .onLinkRightClick(link => {
        if (link) {
          this.router.navigate(['games'], { fragment: (link as GraphLink).gameName })
        }
      }).linkWidth(link => this.highlightLink === link ? 5 : 1)
      .linkLabel(link => (link as GraphLink).gameName)
      .onNodeHover(node => {
        this.highlightNode = null
        if (node) {
          this.highlightNode = node
        }
      })
      .onNodeRightClick(node => {
        if (node) {
          this.router.navigate(['developers'], { fragment: (node as GraphNode).label })
        }
      })
      .nodeCanvasObject((node, ctx, globalScale) => {
        if (node.id === undefined || node.x == undefined || node.y == undefined) return
        const label = (node as any).label;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

        ctx.fillStyle = this.highlightNode === node ? 'rgba(100, 100, 255, 1)' : 'rgba(100, 100, 100, 0.5)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillText(label, node.x, node.y);

        (node as any).__bckgDimensions = bckgDimensions;
      })
      .nodePointerAreaPaint((node, color, ctx) => {
        if (node.x == undefined || node.y == undefined) return
        ctx.fillStyle = color;
        const bckgDimensions = (node as any).__bckgDimensions;
        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
      });
  }

  updateGraph() {
    if (this.graph) {
      this.graph.graphData(this.graphData)
    }
  }
}
