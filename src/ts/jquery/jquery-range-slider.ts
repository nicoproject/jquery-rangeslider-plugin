import Presenter from '../presenter/Presenter'
import '../../scss/app.scss'
import 'bootstrap'
import { IModelOptions, IRunnersArray } from '../view/ViewInterfaces'

;(function ($) {
  $.fn.extend({
    rangeSlider: function (options: IModelOptions, method: any) {
      /** Define default plugin settings */
      let settings = $.extend(
        {
          id: 1,
          step: 10,
          scale: {
            min: 200,
            max: 400,
            isVisible: true,
          },
          orientation: '',
          skin: 'city',
          runners: [
            {
              id: 50123,
              position: 201,
              showTooltip: true,
            },
            {
              id: 2,
              position: -210,
              showTooltip: true,
            },
            {
              id: 3,
              position: 220,
              showTooltip: true,
            },
          ],
        },
        options
      )

      /* Expose public methods */
      let methods = {
        init: function (options: IModelOptions) {
          new Presenter(settings)
        },
        renderBar: () => {
          let slider = new Presenter(settings)
          slider.renderBar()
          console.log('Bar has been rendered')
          
        },
      }

      // default return for each slider
      return $(this).each((...args: any) => {
        // @ts-ignore
        if (methods[method]) {
          // если запрашиваемый метод существует, мы его вызываем
          // все параметры, кроме имени метода придут в метод
          // this так же перекочует в метод
          // @ts-ignore

          return methods[method].apply(
            this,
            Array.prototype.slice.call(args, 1) as []
          )
        }
        if (typeof method === 'object' || !method) {
          // если первым параметром идет объект, либо совсем пусто
          // выполняем метод init

          return methods.init.call(this)
        }
        // если ничего не получилось
        return $.error(
          `Метод "${method}" не найден в плагине jQuery.rangeSlider`
        )
      })
      //   return this.each(function () {
      //     new Presenter(settings)
      //     return this
      //   })
    },
  })
})(jQuery)



