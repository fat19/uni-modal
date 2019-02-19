// Define Constructor
function Modal() {
    this.modal = null;
    this.overlay= null;

    this.transitionEnd = transitionSelect();
    
    // Defaults
    var defaults = {
        caption: '',
        content: '',
        closeButton: true,
        customClass: '',
        animation: '',
        fixedHeight: '',
        width: {
            mobile: '80vw',
            desktop: '500px'
        },
        overlayClose: true,
        callback: null
    }

    // Override Defaults
    if(arguments[0] && typeof arguments[0] === 'object') {
        this.options = overrideDefaults(defaults, arguments[0])
    }
}

// Define Public Methods
Modal.prototype.open = function() {
    if(!window.isModalActive || window.isModalActive === 'undefined') {
        buildModal.call(this, this.options.callback);
    } else {
        this.updateModal.call(this);
        return
    };
    window.isModalActive = true;
    console.log(this);
    window.getComputedStyle(this.modal).height;
    this.modal.classList.add('modal-open');
    this.overlay.classList.add('modal-open');
}

Modal.prototype.close = function() {
    var that = this;
    this.modal.classList.remove('modal-open');
    this.overlay.classList.remove('modal-open');
    this.modal.addEventListener(this.transitionEnd, function() {
        that.modal.parentNode.removeChild(that.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
        if(that.overlay.parentNode) that.overlay.parentNode.removeChild(that.overlay);
        document.body.classList.remove('modal-body-fixed');
    });
    window.isModalActive = false;
}

Modal.prototype.setWidth = function() {
    var that = this;
    function setWidthAction() {
        var optionWidth = that.options.width;
        if(optionWidth != '' && typeof optionWidth === 'string') {
            that.modal.style.width = optionWidth;
        } else if(typeof optionWidth === 'object') {
            window.matchMedia('(max-width: 1200px)').matches ? that.modal.style.width = optionWidth.mobile : that.modal.style.width = optionWidth.desktop;
        }
    }
    
    setWidthAction();
    window.addEventListener('resize', function() {
        setWidthAction()
    })
}

Modal.prototype.updateModal = function() {
    console.log(this);
    var currentModalCaption = document.querySelector('.modal-header');
    var currentModalContent = document.querySelector('.modal-body');
    if(this.options.hasOwnProperty('caption') && this.options.caption !== '') {
        if(typeof this.options.caption === 'string') {
            currentModalCaption.innerHTML = this.options.caption;
        }
    } 

    if(this.options.hasOwnProperty('content')) {
        if(typeof this.options.content === 'string') {
            currentModalContent.innerHTML = this.options.content;
        }
    }

    return;
}

// Define Private Methods
function buildModal(callback) {
    var frag, modalHeader, modalBody, modalFooter, innerWrapper, closeButton;
    // Create Documement Fragment
    frag = document.createDocumentFragment()

    // Modal body and Modal Custom Class
    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    // Modal Header
    modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    // Modal Body
    modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    // Modal Footer
    modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    
    // Modal Overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    /**** Implementing Options ****/
    // Modal Content Inject
    if(this.options.content != '' && typeof this.options.content === 'string') {
        modalBody.innerHTML = this.options.content;
    }

    // Modal Caption Inject
    if(this.options.caption != '' && typeof this.options.caption === 'string') {
        modalHeader.innerHTML = this.options.caption;
    }

    // Modal Custom Class
    if(this.options.customClass != '' && typeof this.options.customClass === 'string') {
        this.modal.classList.add(this.options.customClass);
    }

    // Modal Animation
    if(this.options.animation == 'fade-and-drop' && typeof this.options.animation === 'string') {
        this.modal.classList.add('fade-and-drop');
    }
    
    // Modal Fixed Height
    if(this.options.fixedHeight != '' && typeof this.options.fixedHeight === 'string') {
        this.modal.style.height = this.options.fixedHeight;
    }

    // Modal Set Width
    this.setWidth.call(this);

    // Modal Overlay Close
    if(this.options.overlayClose) {
        this.overlay.addEventListener('click', this.close.bind(this));
    }

    // Modal Close Button
    if(this.options.closeButton) {
        closeButton = document.createElement('div');
        closeButton.className = 'close-modal';
        var closeIcon = document.createElement('i')
        closeIcon.className = 'ico i-close';
        closeButton.appendChild(closeIcon);
        closeButton.addEventListener('click', this.close.bind(this));
        this.modal.appendChild(closeButton);
    }

    //Modal Inner and Join Elements
    innerWrapper = document.createElement('div');
    innerWrapper.className = 'modal-inner';
    innerWrapper.innerHTML += modalHeader.outerHTML + modalBody.outerHTML + modalFooter.outerHTML;
    this.modal.appendChild(innerWrapper)

    // Modal Append Body
    frag.appendChild(this.modal);
    frag.appendChild(this.overlay);
    document.body.appendChild(frag);
    document.body.classList.add('modal-body-fixed');
    
    // Modal Callback
    if(callback != null && typeof callback === 'function') {
        callback();
    }
}

function overrideDefaults(defaults, userOptions) {
    for(var option in userOptions) {
        if(userOptions.hasOwnProperty(option)) {
            defaults[option] = userOptions[option]
        }
    }
    return defaults;
}

function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
}