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

      /* Define parent HTMLElement of plugin call */
        let $parentEl = $(this)[0] as HTMLElement

      /* Expose public methods */
      let methods = {
        init: function (options: IModelOptions) {
          new Presenter(settings, $parentEl)
        },
        renderBar: () => {
          let slider = new Presenter(settings, $parentEl)
          slider.renderBar()
          console.log('Bar has been rendered')
        },
      }

      return $(this).each((...args: any) => {
        // @ts-ignore
        if (methods[method]) {
          // @ts-ignore
          return methods[method].apply(
            this,
            Array.prototype.slice.call(args, 1) as []
          )
        }
        if (typeof method === 'object' || !method) {
          return methods.init.call(this)
        }
        return $.error(
          `Метод "${method}" не найден в плагине jQuery.rangeSlider`
        )
      })
    },
  })
})(jQuery)



