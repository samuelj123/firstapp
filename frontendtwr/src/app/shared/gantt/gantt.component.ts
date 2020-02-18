import { Component, ElementRef, ViewChild, OnInit, AfterContentChecked, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';
import { ProjectsService } from 'src/app/projects/projects.service';
import { Task } from 'src/app/projects/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})

export class GanttComponent implements OnInit {

  constructor(private projservice: ProjectsService, private route: ActivatedRoute) { }

  // //Variables init
  projid: string;
  tasks: Task[];

  // dragHandler = d3.drag()
  //   .on("drag", function () {
  //     d3.select(this)
  //       .attr('x', d3.event.x)
  //   })
  //   .on('end', async () => {
  //     const updatedtask = { id: d3.event.subject.id, startdate: this.rx(d3.event.x), enddate: this.rx(d3.event.subject.enddate + d3.event.x) };
  //     this.newtask = updatedtask;
  //     if (this.newtask !== undefined) {
  //       // await this.projservice.updatetask(this.newtask.id, this.newtask).toPromise();
  //       this.newtask = undefined;
  //       console.log(d3.event);
  //     } else {
  //       console.log('newtask undefined');
  //     }
  //   });

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.tasks = await this.projservice.gettasksinproj(this.projid).toPromise() as Task[];

    // set the dimensions and margins of the graph
    let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    length= this.tasks.length;

    // append the SVG object to the body of the page
    var SVG = d3.select("#gantt")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .data(this.tasks)
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
      .range([ 0, width ])
      .domain([0, d3.max(this.tasks, d => {return d.enddate + 10})]);
    var xAxis = SVG.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, length])
      .range([height, 0]);
    var yAxis = SVG.append("g")
      .call(d3.axisLeft(y));

    // Make a clipPath: everything out of this area won't be drawn.
    var clip = SVG.append("defs").append("SVG:clipPath")
      .attr("id", "clip")
      .append("SVG:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

    // Create the bars box: and add the above clipPath
    var scatter = SVG.append('g')
    .attr("clip-path", "url(#clip)")

    // Add bars
    var bars = scatter
      .selectAll("rect")
      .data(this.tasks)
      .enter();
    var bar = bars
    .append("rect")
      .attr('class', 'bar')
      .attr('id', d => { return d.id })
      .attr('x', d => { return x(d.startdate) + 'px' })
      .attr('width', d => { return x(d.enddate - d.startdate) + 'px' })
      .attr("y", (d, i) => { return y(i+1)+ 'px' })
      .attr('height', height/length - 1 + 'px')
      .style("fill", d => {return "rgb(179, 77, "+ (d.enddate) + 252+")";})
      .style("opacity", 0.5);
    // Text for the Bar
    var txt = bars
    .append('text')
      .attr('class', 'bar')
      .attr('id', d => { return d.id })
      .attr('x', d => { return x(d.startdate) + 3 + 'px' })
      // .attr('width', d => { return y(d.enddate - d.startdate) + 'px' })
      .attr("y", (d, i) => { return y(i+1)+(height/length+1)/2+ 'px' })
      .style('fill', 'white')
      .text(d => {return d.task});

    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    var zoom = d3.zoom()
      .scaleExtent([1, 10])  // This control how much you can unzoom (x0.5) and zoom (x20)
      .extent([[0, 0], [width, height]])
      .on("zoom", zoomChart);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    SVG.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom);
    // now the user can zoom and it will trigger the function called updateChart

    // A function that zooms the chart when the user zoom and thus new boundaries are available
    function zoomChart() {
      // the new scale...
      var transform = d3.event.transform;
      transform.x = Math.min(0, transform.x); // Prevent the thing to zoom/pan to the negatives
      var newX = transform.rescaleX(x);

      // update axis
      xAxis.call(d3.axisBottom(newX))

      // update bar and text positions acc.. the new Scale
      bar
        .attr('x', d => { return newX(d.startdate) })
        .attr('width', d => { return newX(d.enddate) - newX(d.startdate)})
      txt
        .attr('x', d => { return newX(d.startdate) + 3 + 'px' })
    }
  }
}
