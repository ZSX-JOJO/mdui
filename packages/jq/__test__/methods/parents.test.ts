import { jQuery, jq, assert, JQStatic, toIdArray } from '../utils.js';
import '../../methods/parents.js';
import '../../methods/eq.js';
import '../../methods/is.js';

const test = ($: JQStatic, type: string): void => {
  describe(`${type} - .parents`, () => {
    beforeEach(() => {
      document.querySelector('#frame')!.innerHTML = `
<div id="child1" class="child1 parent">
  <div id="child1-1" class="child2 parent">
    <div id="child1-1-1" class="child3"></div>
    <div id="child1-1-2" class="child3"></div>
  </div>
  <div id="child1-2" class="child2"></div>
</div>
<div id="child2" class="child1 parent">
  <div id="child2-1" class="child2 parent">
    <div id="child2-1-1" class="child3"></div>
    <div id="child2-1-2" class="child3"></div>
  </div>
  <div id="child2-2" class="child2"></div>
</div>
`;
    });

    it('.parents(selector)', () => {
      const $child111 = $('#child1-1-1');
      const $child3 = $('.child3');

      let $parents = $('#child1-1-2').parents();

      // jquery 把最顶层的 document 也包含；mdui.jq 不包含
      assert.isTrue($parents.eq(0).is('#child1-1'));
      assert.isTrue($parents.eq(1).is('#child1'));
      assert.isTrue($parents.eq(2).is('#frame'));
      assert.isTrue($parents.eq(3).is('body'));
      assert.isTrue($parents.eq(4).is('html'));

      $parents = $child111.parents('#child1');
      assert.sameOrderedMembers(toIdArray($parents), ['child1']);

      $parents = $child111.parents('.parent');
      assert.sameOrderedMembers(toIdArray($parents), ['child1-1', 'child1']);

      // 顺序和 jquery 不同
      $parents = $child3.parents();
      assert.lengthOf($parents, 7);

      $parents = $child3.parents('.parent');
      assert.sameOrderedMembers(toIdArray($parents), [
        'child2-1',
        'child2',
        'child1-1',
        'child1',
      ]);

      $parents = $child3.parents('.child1');
      assert.sameOrderedMembers(toIdArray($parents), ['child2', 'child1']);
    });
  });
};

test(jq, 'jq');
test(jQuery as unknown as JQStatic, 'jQuery');
