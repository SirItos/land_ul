import $ from 'jquery'
import { initForm } from './forma'
/**
 * Функция рендера формы для оплаты
 */
export const formRender = ({
  target = '#form',
  buttonName = 'Забронировать',
  noBinding = false
}) => {
  const domForm = `<div  class="form bg-white rounded-lg  shadow-lg  px-4 py-4"><form id="pay-form" class="space-y-8"><div class="text-2xl text-center"> Забронировать свое место
                </div>
                <div class="w-full relative input-group">   
                <select
                class="tariff bg-white border border-gray-200 px-2 py-2 w-full rounded-md transition duration-300 focus:outline-none focus:ring-2 ring-orange-200"
                name="tariff" placeholder="Тариф">
                 <option class="hidden" selected value="">Выберите тариф</option>
                <option value="2790">Один в поле воин</option>
                <option value="4290">Мне нужна поддержка</option>
                <option value="6990">Путь: рука за руку</option>
            </select>
            <div class="error px-2 absolute overflow-hidden ">
            <div class="transition duration-300 transform -translate-y-10 text-red-700 ">Необходимо заполнить поле</div></div>
            </div><div class="w-full relative input-group">
            <input class="border border-gray-200 px-2 py-2 w-full rounded-md transition duration-300 focus:outline-none focus:ring-2 ring-orange-200" 
            type="email" name="email" placeholder="Email" /><div class="error px-2 absolute overflow-hidden "><div class="transition duration-300 transform -translate-y-10 text-red-700 ">Необходимо заполнить поле</div></div> </div><div class="w-full relative"><input class="nickname border border-gray-200 px-2 py-2 w-full rounded-md transition duration-300 focus:outline-none focus:ring-2 ring-orange-200" type="text" name="nickname" placeholder="Ник в instagram" /><div class="error px-2 absolute overflow-hidden "><div class="transition duration-300 transform -translate-y-10 text-red-700 ">Необходимо заполнить поле</div> </div></div>
            <div class="flex justify-center">
            <button class="pay-form-submit py-2 px-4 text-2xl  text-white  font-semibold  rounded-lg  shadow-btn  focus:outline-none bg-orange-400  / transition duration-300 ease-in-out">${buttonName}</button>
             </div> </form>`

  $(target).append(domForm)

  initForm(noBinding)
}
