function Dropdown(o)
                {
                    this.options = o;

                    window.getbox = function(elem) {
                        var id = elem.closet('.dropdown').parentElement.id;
                        return window.dropdowns[id];
                    }
                    this.init = function(){
                        this.elem = document.getElementById(this.options.id)

                        var val = this.options.val;
                        var html = `<div class='dropdown'>
                                        <div class='dropdown_value'>${val}
                                            </div>
                                        <div class='dropdown_arrow'>↓</div>
                                        <div class='dropdown_panel'>
                                            <div class='dropdown_items'>
                                            </div>
                                        </div
                                    </div>`;

                        this.elem.innerHTML = html;
                        var elem = this.elem;

                        this.elem.style.display = 'inline-block';

                        if (!window.dropdowns) window.dropdowns = {};
                        window.dropdowns[this.options.id] = this;

                        this.items = elem.querySelector(".dropdown_items");
                        this.arrow = elem.querySelector(".dropdown_arrow");
                        this.value = elem.querySelector(".dropdown_value");

                        var data = this.options.data;
                        html = "";
                        data.forEach(function(elem)
                        {
                            html += `<div class=dropdown_item'
                                onmousedown='var self'=getbox(this);self.clicked(this)'
                                >${elem}</div>
                                `;
                        });
                        this.items.innerHTML = html;

                        var self = this;

                        document.addEventListener('mousedown', function()
                        {
                            self.hide();
                        });

                        this.elem.addEventListener('mousedown', function()
                        {
                            event.stopImmediatePropagation();

                            if (self.isVisible)
                                self.hide();
                            else
                                self.show();
                        });
                    }

                    this.clicked = function(elem) {
                        event.stopPropagation();
                        this.hide();

                        var newval = elem.innerHTML;
                        this.value.innerHTML = newval;

                        if (this.option.cb)
                        this.option.cb(newval);
                    }

                    this.show = function() {
                        for (var box in window.dropdowns)
                            window.dropdowns[box].hide();

                        this.isVisible = true;
                        this.items.style.transform = 'translate(0px, 0px)';
                        this.arrow.style.transform = 'rotate(90deg)';
                    }

                    this.hide = function() {

                        if (!this.isVisible) return;
                        
                        this.isVisible = false;
                        this.items.style.transform = 'translate(0px, -255px)';
                        this.arrow.style.transform = 'rotate(0deg)';
                    }

                    this.init();
                    return this;
                }
                var box1 = new Dropdown({
                    val: 'Day',
                    id: 'box1',
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                    cb: function(newval) {
                        //alert(newval);
                    }
                });

                var box2 = new Dropdown({
                    val: 'Month',
                    id: 'box2',
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    cb: function(newval) {
                        //alert(newval);
                    }
                });