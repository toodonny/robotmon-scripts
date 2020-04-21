function Task(page, name) {
  this._isInit = false;
  this._doNextTask = false;
  this._doAgainTask = false;
  this._delayUntil = 0;

  this.context = undefined;
  this.bundle = {};
  this.page = page;
  this.name = name;
  this.type = Enum.TypeTask;
  this.onTask = function() {};
  this.onInit = function() {};
  this.onEnter = function() {};
  this.onExit = function() {};
  this.onRun = function() {};
}