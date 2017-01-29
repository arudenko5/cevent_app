"use strict";$(".js-numeric-input").keydown(function(e){$.inArray(e.keyCode,[46,8,9,27,13,110,190])!==-1||65===e.keyCode&&(e.ctrlKey===!0||e.metaKey===!0)||e.keyCode>=35&&e.keyCode<=40||(e.shiftKey||e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)&&e.preventDefault()}).blur(function(){var e=$(this);(""===e.val()||isNaN(parseInt(e.val())))&&e.val(0)}),function(e,t,n){n(e).ready(function(){n(".form__row--togglable").on("click",function(e){n(this).toggleClass("expanded")}),n(".calc-block").on("click",function(e){e.stopPropagation()})})}(document,window,$),function(e,t,n){function a(e){var t="",a=e.find(".form__text-holder");e.find('input[type="checkbox"], input[type="radio"] ').each(function(){n(this).prop("checked")&&(t+=n('label[for="'+n(this).attr("id")+'"]').text()+" <br/>")}),""!==t?a.html(t):a.html(a.data("title")+": не выбрано")}n(e).ready(function(){n('.calc-block input[type="checkbox"], .calc-block input[type="radio"] ').on("change",function(){a(n(this).parents(".form__row"))})})}(document,window,$);var app={},INFO={people:{men:null,women:null,kids:null},drinks:[],alko:null},NON_ALKO=["drinks_soda","drinks_water","drinks_juice"],FOOD_TYPES={cold_snacks:"Холодные закуски",hot_snacks:"Горячие закуски",salads:"Салаты",hot_dishes:"Горячие блюда",garnish:"Гарнир",fruits:"Фрукты"};$(document).ready(function(){function e(){var e=$(".js-preloader");e.removeClass("hidden"),$("body").removeClass("body__first-time"),setTimeout(function(){e.addClass("hidden"),app.calcDrinks(),app.calcFoods(),app.calcArea(),app.calcStaff()},800)}function t(e){$(".js-tab-content-item").each(function(){var t=$(this).data("type");t===e?$(this).removeClass("hidden"):$(this).addClass("hidden")})}var n="tab_1";app.get=function(e){var t={men:function(){return $("#men").val()},women:function(){return $("#women").val()},kids:function(){$("#kids").val()<0?0:$("#kids").val();return $("#kids").val()},drinks:function(){var e=[];return $('input[name="drinks"]').each(function(){$(this).prop("checked")&&e.push($(this).val())}),e},area_spec:function(){var e=[];return $('input[name="area_spec"]').each(function(){$(this).prop("checked")&&e.push($(this).val())}),e},alko:function(){return console.log($('input[name="alko"]:checked').val()),$('input[name="alko"]:checked').val()},banket_type:function(){return $('input[name="banket_type"]:checked').val()},sitting:function(){return $('input[name="sitting_type"]:checked').val()}};if(t.hasOwnProperty(e))return t[e]();throw new Error("Wring drink type: "+e)},$(".js-calc-all-button").on("click",function(){console.log("clicked"),e()}),$(".js-unique-app-control").on("change",function(){e()}),$(".js-app-input").on("keydown",function(t){var n=t.keyCode;13===n&&e()}),$(".js-tab-item").on("click",function(e){var a=$(e.currentTarget);$(".active").removeClass("active"),a.addClass("active"),n=a.attr("id"),t(n)})}),app.calcDrinks=function(){var e,t,n=$(".js-drink-row"),a=app.get("drinks"),i=app.get("alko"),o=isNaN(parseInt(app.get("men")))?0:parseInt(app.get("men")),p=isNaN(parseInt(app.get("women")))?0:parseInt(app.get("women")),m=isNaN(parseInt(app.get("kids")))?0:parseInt(app.get("kids"));n.each(function(){if(e=$(this).data("drink"),t=calcDrink(i,e),a.indexOf(e)>-1||NON_ALKO.indexOf(e)>-1){var n=t.info.men*o+t.info.women*p+t.info.kids*m,s=0===t.info.kids?0:m;$(this).find(".js-liters").html(Math.round(100*n)/100),$(this).find(".js-grammes").html(Math.round(n/(o+p+s)*1e3*100)/100),$(this).find(".js-bottles").html(Math.round(n/t.bottle_index*100)/100)}else $(this).find(".js-liters").html("-"),$(this).find(".js-bottles").html("-"),$(this).find(".js-grammes").html("-")})},app.calcFoods=function(){var e=app.get("banket_type"),t=(isNaN(parseInt(app.get("men")))?0:parseInt(app.get("men")),isNaN(parseInt(app.get("women")))?0:parseInt(app.get("women")),isNaN(parseInt(app.get("kids")))?0:parseInt(app.get("kids")),$(".js-food-table")),n=calcFood(e),a=n.food,i=n.types,o={optimum:150,max:200},p='<tr class="js-specific-row"><td><span class="table__bold table__bold_small">%title%</span></td><td><span>%min%</span></td><td><span>%kid_min%</span></td><td><span>%optimum%</span></td><td><span>%kid_optimum%</span></td><td><span>%max%</span></td><td><span>%kid_max%</span></td></tr>';console.log(i),$(".js-specific-row").detach(),i.forEach(function(e){$(".js-cake-row").before(p.replace("%title%",FOOD_TYPES[e.type]).replace("%min%",e.percentage/100*a.min).replace("%kid_min%",e.percentage/100*a.min*.75).replace("%optimum%",e.percentage/100*a.optimum).replace("%kid_optimum%",e.percentage/100*a.optimum*.75).replace("%max%",e.percentage/100*a.max).replace("%kid_max%",e.percentage/100*a.max*.75))}),t.find(".js-food-min").html(a.min),t.find(".js-food-kid-min").html(.75*a.min),t.find(".js-food-optimum").html(a.optimum),t.find(".js-food-kid-optimum").html(.75*a.optimum),t.find(".js-food-max").html(a.max),t.find(".js-food-kid-max").html(.75*a.max),t.find(".js-cake-optimum").html(o.optimum),t.find(".js-cake-max").html(o.max),t.find(".js-cake-kid-optimum").html(.75*o.optimum),t.find(".js-cake-kid-max").html(.75*o.max)},app.calcArea=function(){var e=app.get("banket_type"),t=app.get("area_spec"),n=isNaN(parseInt(app.get("men")))?0:parseInt(app.get("men")),a=isNaN(parseInt(app.get("women")))?0:parseInt(app.get("women")),i=isNaN(parseInt(app.get("kids")))?0:parseInt(app.get("kids")),o=n+a+i,p=$(".js-place-table"),m=p.find(".js-base-area"),s=p.find(".js-toilets"),d=calcArea(e),r=0,c=0,l=0,f=0,u={area_2:{min:30,optimum:30},area_3:{min:45,optimum:45},area_4:{min:20,optimum:20}};t.indexOf("area_1")>-1&&(r+=1,l=r*o,c+=1.2,f=c*o),r+=d.min,l=r*o,c+=d.optimum,f=c*o,p.find(".js-place-table-row").each(function(){$(this).find(".place-min").html("-"),$(this).find(".place-optimum").html("-")}),s.find(".place-min").html(Math.ceil(o/60)),s.find(".place-optimum").html(Math.ceil(o/50)),m.find(".place-min").html(Math.ceil(l)),m.find(".place-optimum").html(Math.ceil(f));for(var k=0;k<t.length;k++)p.find('.js-place-table-row [data-place-row="'+t[k]+'"]')&&u.hasOwnProperty(t[k])?(p.find('.js-place-table-row[data-place-row="'+t[k]+'"]').find(".place-min").html(Math.ceil(u[t[k]].min)),p.find('.js-place-table-row[data-place-row="'+t[k]+'"]').find(".place-optimum").html(Math.ceil(u[t[k]].optimum)),l+=u[t[k]].min,f+=u[t[k]].optimum):p.find('.js-place-table-row [data-place-row="'+t[k]+'"]')&&(p.find('.js-place-table-row[data-place-row="'+t[k]+'"]').find(".place-min").html("-"),p.find('.js-place-table-row[data-place-row="'+t[k]+'"]').find(".place-optimum").html("-"));p.find('[data-place-row="summ"]').find(".place-optimum").html(Math.ceil(f)),p.find('[data-place-row="summ"]').find(".place-min").html(Math.ceil(l))},app.calcStaff=function(){var e=app.get("banket_type"),t=app.get("area_spec"),n=calcStaff(e),a=isNaN(parseInt(app.get("men")))?0:parseInt(app.get("men")),i=isNaN(parseInt(app.get("women")))?0:parseInt(app.get("women")),o=isNaN(parseInt(app.get("kids")))?0:parseInt(app.get("kids")),p=a+i+o,m=$(".js-staff-table"),s=m.find(".js-staff-waiter"),d=m.find(".js-staff-barman"),r=m.find(".js-staff-garderob");s.find(".js-min").html(Math.round(p/n.min)),console.log(p/n.min),s.find(".js-optimum").html(Math.round(p/n.optimum)),console.log(p/n.optimum),r.find(".js-min").html(Math.round(p/70)),r.find(".js-optimum").html(Math.round(p/50)),t.indexOf("area_3")>-1?(d.find(".js-min").html(Math.round(p/n.min)+Math.round(p/60)),d.find(".js-optimum").html(Math.round(p/n.min)+Math.round(p/40))):(d.find(".js-min").html("-"),d.find(".js-optimum").html("-"))};var calcDrink=function(e,t){var n={drinks_wine_white:{few:{men:.35,women:.7,kids:0},middle:{men:.7,women:.7,kids:0},alot:{men:.7,women:1.4,kids:0},bottle_index:.7},drinks_wine_red:{few:{men:.35,women:.7,kids:0},middle:{men:.7,women:.7,kids:0},alot:{men:.7,women:1.4,kids:0},bottle_index:.7},drinks_hard:{few:{men:.25,women:0,kids:0},middle:{men:.5,women:.15,kids:0},alot:{men:.75,women:.25,kids:0},bottle_index:.5},drinks_brut:{few:{men:.21,women:.21,kids:0},middle:{men:.35,women:.35,kids:.35},alot:{men:.35,women:.7,kids:.35},bottle_index:.75},drinks_soda:{few:{men:.5,women:.5,kids:1},middle:{men:1,women:1,kids:1},alot:{men:1,women:1,kids:1},bottle_index:2},drinks_juice:{few:{men:.5,women:.5,kids:.5},middle:{men:.5,women:.5,kids:.5},alot:{men:1,women:.5,kids:.5},bottle_index:1},drinks_water:{few:{men:.5,women:.5,kids:0},middle:{men:.5,women:.5,kids:.5},alot:{men:.5,women:.5,kids:0},bottle_index:1.5}};return{info:n[t][e],bottle_index:n[t].bottle_index}},calcFood=function(e){var t={banket_1:{food:{min:700,optimum:1100,max:1500},types:[{type:"cold_snacks",percentage:25},{type:"hot_snacks",percentage:10},{type:"salads",percentage:20},{type:"hot_dishes",percentage:20},{type:"garnish",percentage:10},{type:"fruits",percentage:15}]},banket_2:{food:{min:700,optimum:1100,max:1500},types:[{type:"cold_snacks",percentage:25},{type:"hot_snacks",percentage:10},{type:"salads",percentage:20},{type:"hot_dishes",percentage:20},{type:"garnish",percentage:10},{type:"fruits",percentage:15}]},banket_3:{food:{min:700,optimum:800,max:1200},types:[{type:"cold_snacks",percentage:30},{type:"hot_snacks",percentage:30},{type:"hot_dishes",percentage:20},{type:"fruits",percentage:20}]},banket_4:{food:{min:400,optimum:500,max:700},types:[{type:"cold_snacks",percentage:30},{type:"hot_snacks",percentage:30},{type:"hot_dishes",percentage:20},{type:"fruits",percentage:20}]},banket_5:{food:{min:500,optimum:700,max:900},types:[{type:"cold_snacks",percentage:40},{type:"hot_snacks",percentage:20},{type:"salads",percentage:20},{type:"fruits",percentage:20}]}};return t[e]},calcArea=function(e){var t=app.get("sitting"),n={banket_1:{min:"sitting_1"===t?2.3:2.8,optimum:"sitting_1"===t?2.5:3},banket_2:{min:"sitting_1"===t?2.3:2.8,optimum:"sitting_1"===t?2.5:3},banket_3:{min:2.3,optimum:2.5},banket_4:{min:1.5,optimum:1.7},banket_5:{min:1.5,optimum:1.7}};return n[e]},calcStaff=function(e){var t={banket_1:{min:10,optimum:6},banket_2:{min:12,optimum:10},banket_3:{min:15,optimum:12},banket_4:{min:20,optimum:15},banket_5:{min:20,optimum:15}};return t[e]};