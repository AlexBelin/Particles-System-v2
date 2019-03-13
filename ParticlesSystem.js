/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007
Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.
Copyright (C) 2019, By Alexandre Belin
*/
function ParticleObj(Emitter, ParticlesName, RenderClass, PartPosX, PartPosY, Transition, Frequency, PartSize, Amplitude, _Index, ParticlesDirection){
    this.Emitter = Emitter;
    this.ParticlesName = ParticlesName;
    this.RenderClass = RenderClass || 'NoClass';
    this.PartPosX = PartPosX;
    this.PartPosY = PartPosY;
    this.Transition = Transition;
    this.Frequency = Frequency;
    this.PartSize = PartSize;
    this.Amplitude = Amplitude;
    this._Index = _Index;
    this.ParticlesDirection = ParticlesDirection;
    var _ParticleDom = document.createElement('div');
    _ParticleDom.id = this.ParticlesName + '-' + this._Index;
    _ParticleDom.classList.add(this.RenderClass);
    _ParticleDom.style.position = 'absolute';
    _ParticleDom.style.transition = 'all ' + (this.Transition / 1000) + 's linear';
    _ParticleDom.style.width = this.PartSize + 'px';
    _ParticleDom.style.height = this.PartSize + 'px';
    _ParticleDom.style.top = Math.floor(this.PartPosY) + 'px';
    _ParticleDom.style.left = Math.floor(this.PartPosX) + 'px';
    _ParticleDom.style.zIndex = document.getElementById(this.Emitter).style.zIndex;
    document.body.appendChild(_ParticleDom);
    this.AnimateParticle = function(){
        var _this = this;
        setTimeout(function(){
            _ParticleDom.style.transform = 'translate3d(' + (_this.ParticlesDirection[0] * _this.Amplitude) + 'px, ' + (_this.ParticlesDirection[1] * _this.Amplitude) + 'px, 0)';
        }, 20);
        setTimeout(function(){
            _ParticleDom.style.transition = 'all 0.25s';
            _ParticleDom.style.opacity = '0';
        }, (_this.Transition - 250));
        setTimeout(function(){
            _ParticleDom.remove();
        }, _this.Transition);
    };
}
/*=================================================*/
function ParticleSysBase(Emitter, ParticlesName, RenderClass, Transition, SizeMin, SizeMax, Amplitude){
    this.Emitter = Emitter;
    this.ParticlesName = ParticlesName;
    this.RenderClass = RenderClass;
    this.Transition = Transition;
    this.SizeMin = SizeMin;
    this.SizeMax = SizeMax;
    this.Amplitude = Amplitude;
}
/*=================================================*/

function ParticleSys(Emitter, ParticlesName, RenderClass, Transition, SizeMin, SizeMax, Amplitude, Frequency, ParticlesDirection){
    ParticleSysBase.call(this, Emitter, ParticlesName, RenderClass, Transition, SizeMin, SizeMax, Amplitude);
    this.Frequency = Frequency;
    this.ParticlesDirection = ParticlesDirection;
    var PartEmition;
    this.KillParticles = function(){
        clearInterval(PartEmition);
    };
    this.RenderParticles = function(){
        var _this = this;
        var i = 0;
        PartEmition = setInterval(function(){
            var EmitterSizeX = document.getElementById(_this.Emitter).getBoundingClientRect().width;
            var EmitterSizeY = document.getElementById(_this.Emitter).getBoundingClientRect().height;
            var EmitterPosX = document.getElementById(_this.Emitter).getBoundingClientRect().left;
            var EmitterPosY = document.getElementById(_this.Emitter).getBoundingClientRect().top;
            var PartSize = Math.floor(Math.random() * (_this.SizeMax - _this.SizeMin)) + _this.SizeMin;
            var PartPosX = (Math.floor(Math.random() * ((EmitterPosX + EmitterSizeX) - EmitterPosX)) + EmitterPosX) - (PartSize / 2);
            var PartPosY = (Math.floor(Math.random() * ((EmitterPosY + EmitterSizeY) - EmitterPosY)) + EmitterPosY) - (PartSize / 2);
            var _Particle = new ParticleObj(_this.Emitter, _this.ParticlesName, _this.RenderClass, PartPosX, PartPosY, _this.Transition, _this.Frequency, PartSize, _this.Amplitude, i, _this.ParticlesDirection);
            _Particle.AnimateParticle();
            i++;
        }, _this.Frequency);
    };
    }
    ParticleSys.prototype = Object.create(ParticleSysBase.prototype);
    ParticleSys.prototype.constructor = ParticleSys;
    /*=================================================*/
    function ParticleExplosionSys(Emitter, ParticlesName, RenderClass, Transition, SizeMin, SizeMax, Amplitude, ParticlesQty){
    ParticleSysBase.call(this, Emitter, ParticlesName, RenderClass, Transition, SizeMin, SizeMax, Amplitude);
    this.ParticlesQty = ParticlesQty;
    this.ParticlesArray = [];
    this.RenderParticles = function(){
        for(var i = 0 ; i < this.ParticlesQty ; i++){
            var EmitterSizeX = document.getElementById(this.Emitter).getBoundingClientRect().width;
            var EmitterSizeY = document.getElementById(this.Emitter).getBoundingClientRect().height;
            var EmitterPosX = document.getElementById(this.Emitter).getBoundingClientRect().left;
            var EmitterPosY = document.getElementById(this.Emitter).getBoundingClientRect().top;
            var PartSize = Math.floor(Math.random() * (this.SizeMax - this.SizeMin)) + this.SizeMin;
            var PartPosX = (Math.floor(Math.random() * ((EmitterPosX + EmitterSizeX) - EmitterPosX)) + EmitterPosX) - (PartSize / 2);
            var PartPosY = (Math.floor(Math.random() * ((EmitterPosY + EmitterSizeY) - EmitterPosY)) + EmitterPosY) - (PartSize / 2);
            var DirectionX = (Math.random() * 2) - 1;
            var DirectionY = (Math.random() * 2) - 1;
            this.ParticlesDirection = [DirectionX, DirectionY];
            var _Particle = new ParticleObj(this.Emitter, this.ParticlesName, this.RenderClass, PartPosX, PartPosY, this.Transition, this.Frequency, PartSize, this.Amplitude, i, this.ParticlesDirection);
            _Particle.AnimateParticle();
        }
    };
}
ParticleExplosionSys.prototype = Object.create(ParticleSysBase.prototype);
ParticleExplosionSys.prototype.constructor = ParticleExplosionSys;