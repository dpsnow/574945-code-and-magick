'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHIFT = 10;
var VERTICAL_SHIFT = 20;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomBlueShade() {
  var RangeBlueColor = [[0, 15], [0, 110], [115, 255]];
  var color = '';
  for (var i = 0; i < RangeBlueColor.length; i++) {
    color += getRandomInteger(RangeBlueColor[i][0], RangeBlueColor[i][1]);
    if (i !== RangeBlueColor.length - 1) {
      color += ', ';
    }
  }
  return 'rgb(' + color + ')';
}

function getMaxElement(arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHIFT, CLOUD_Y + SHIFT, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';

  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + SHIFT * 10, VERTICAL_SHIFT);
  ctx.fillText('Список результатов:', CLOUD_X + SHIFT * 10, VERTICAL_SHIFT * 2);

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + SHIFT * 5 + (BAR_WIDTH * 2 + SHIFT) * i, CLOUD_HEIGHT - BAR_HEIGHT * times[i] / maxTime - SHIFT - TEXT_HEIGHT - VERTICAL_SHIFT);
    ctx.fillStyle = getRandomBlueShade();
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + SHIFT * 5 + (BAR_WIDTH * 2 + SHIFT) * i, CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - SHIFT - TEXT_HEIGHT, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + SHIFT * 5 + (BAR_WIDTH * 2 + SHIFT) * i, CLOUD_HEIGHT - VERTICAL_SHIFT);
  }
};
