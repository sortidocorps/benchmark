
(function() {
    angular.module("benchmark").directive("theGraphic",
    [
        function () {
            return {
                restrict: "EA",
                require: ['ngModel'],
                scope: { model: '=ngModel'},
                template: '<div class="chartsResponsive" id="{{::model.id}}"></div>',
                link:
                function (scope, elem, attr) {
                        //console.log(elem[0]);

                    g = new Dygraph(elem[0].firstChild, scope.model.name, // path to CSV file
                        {
                            animatedZooms : true,
                            title : "Ecran " + scope.model.screen,
                            titleHeight : 32,
                            delimiter: ";",
                            axes: {
                                x: {
                                    axisLabelFormatter: function (d, gran) {
                                        return d.toLocaleDateString();
                                    },
                                    valueFormatter: function (ms) {
                                        return new Date(ms).toLocaleDateString();
                                    }
                                }
                            },
                            series: {
                                second: {
                                  drawPointCallback: function (g, series, ctx, cx, cy, color, radius, idx) {
                                    var y = g.getValue(idx, 1);
                                    var pointColor = y < 3 ? 'springgreen' : 'red';
                                    ctx.save();
                                    ctx.fillStyle = pointColor;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, radius, 2 * Math.PI, false);
                                    ctx.closePath();
                                    ctx.fill();
                                  },
                                  pointSize: 4,
                                  drawPoints: true
                                }
                              }
                        } // options
                        
                    );


                }

              
                  
                
            };
        }
    ]);
})();