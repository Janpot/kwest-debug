'use strict';

var util      = require('util'),
    columnify = require('columnify'),
    http      = require('http'),
    chalk     = require('chalk');

var colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray'
];

function indent(text, indentation) {
  return text
    .split('\n')
    .map(function (line) {
      return indentation + line;
    })
    .join('\n');
}

function formatHeaders(headers) {
  return indent(columnify(headers, {
    maxWidth: 80,
    showHeaders: false,
    config: {key: {align: 'right', format: '%s :'}},
    dataTransform: function(cell, column, index) {
      if (column.format) {
        return util.format(column.format, cell);
      }
      return cell;
    }
  }), '    ');
}

function formatRequest(request) {
  var parts = [];
  var title = util.format('%s %s', request.method, request.uri.href);
  parts.push(chalk.bold.underline(title));

  if (Object.keys(request.headers).length > 0) {
    parts.push(formatHeaders(request.headers));
  }
  return parts.join('\n'); 
}

function formatResponse(url, response) {
  var parts = [];

  var statusCode = response.statusCode,
      statusText = http.STATUS_CODES[response.statusCode],
      title = util.format('%s : %d %s', url, statusCode, statusText);
  parts.push(chalk.bold.underline(title));

  if (Object.keys(response.headers).length > 0) {
    parts.push(formatHeaders(response.headers));
  }
  return parts.join('\n'); 
}

function applyColor(text, color) {
  return chalk[color](text);
}

function debug(stream) {
  stream = stream || process.stdout;
  var globalId = 1;

  return function (request, next) {
    var id = globalId,
        colorIdx = id % colors.length,
        color = colors[colorIdx],
        applyColor = chalk[color],
        href = request.uri.href;
    globalId += 1;

    var formattedRequest = applyColor(formatRequest(request));
    stream.write(formattedRequest + '\n');

    return next(request).tap(function (response) {
      var formattedResponse = applyColor(formatResponse(href, response));
      stream.write(formattedResponse + '\n');
    });
  };
}


module.exports = debug;
