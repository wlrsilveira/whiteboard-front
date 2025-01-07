<script>
  import Konva from 'konva';
  import Pusher from "pusher-js";
  import { useWhiteboardStore } from "@/stores/whiteboards";
  import debounce from 'lodash/debounce';

  export default {
    props: {
      whiteboard: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        stage: null,
        layer: null,
        isDrawing: false,
        currentLine: null,
        isEraser: false,
        strokeColor: "black",
        strokeWidth: 2,
        pusher: null,
        channel: null,
        store: useWhiteboardStore(),
      };
    },
    mounted() {
      this.stage = new Konva.Stage({
        container: this.$refs.container,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
      this.stage.on("mousedown", this.startDrawing);
      this.stage.on("mousemove", this.draw);
      this.stage.on("mouseup", this.stopDrawing);

      this.store.initializePusher();
      this.store.subscribeToWhiteboard(this.whiteboard.identifier);
      this.store.bindDrawingUpdated(this.updateCanvas);
    },
    beforeUnmount() {
      this.store.unbindDrawingUpdated();
    },
    methods: {
      enableEraser() {
        this.isEraser = true;
      },
      disableEraser() {
        this.isEraser = false;
      },
      startDrawing(event) {
        this.isDrawing = true;
        const pos = this.stage.getPointerPosition();
        this.currentLine = new Konva.Line({
          stroke: this.strokeColor,
          strokeWidth: this.strokeWidth,
          points: [pos.x, pos.y],
          lineCap: 'square',
          lineJoin: 'square',
        });
        this.layer.add(this.currentLine);
      },
      draw(event) {
        if (!this.isDrawing) return;

        const pos = this.stage.getPointerPosition();
        const newPoints = this.currentLine.points().concat([pos.x, pos.y]);

        this.currentLine.stroke(this.strokeColor);
        this.currentLine.points(newPoints);
        this.layer.batchDraw();
      },
      stopDrawing: debounce(function () { 
        this.isDrawing = false;

        if (this.currentLine) {
          const drawingData = {
            points: this.currentLine.points(),
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
          };

          this.store.drawing(drawingData);

          this.currentLine = null;
        }
      }, 100),
      increaseStroke() {
        this.strokeWidth += 1;
      },
      decreaseStroke() {
        if (this.strokeWidth > 1) {
          this.strokeWidth -= 1;
        }
      },
      updateCanvas(data) {
        data = data.data;
        console.log(data);
        const line = new Konva.Line({
          stroke: data.strokeColor,
          strokeWidth: data.strokeWidth,
          points: data.points,
          lineCap: 'square',
          lineJoin: 'square',
        });
        this.layer.add(line);
        this.layer.batchDraw();
      },
    },
  };
</script>
<template>
  <div ref="container" class="bg-white border border-s-orange-500 rounded-lg"></div>

  <div class="flex justify-between">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div class="p-3 flex flex-col items-start">
        <label>Color</label>
      </div>
      <div class=" p-3 flex flex-col items-start">
        <input type="color" v-model="strokeColor"/>  
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div class="p-3 flex flex-col items-start">
        <label>Stroke Width</label>
      </div>
      <div class="justify-center align-center p-3 flex ">
        <button class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-2" @click="decreaseStroke">-</button>
        <button class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-2" @click="increaseStroke">+</button>
      </div>
    </div>

  </div>
  
</template>
  
  