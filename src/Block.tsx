import { useState, CSSProperties, useCallback, DOMAttributes } from 'react';
import { randomColor } from './utils';

enum Dir {
  vertical,
  horizontal,
}

type BlockProps = {
  style?: CSSProperties;
  dir?: Dir;
};

const defaultStyle = { width: '100%', height: '100%' };

const Block = (props: BlockProps) => {
  const { style = defaultStyle, dir = Dir.vertical } = props;

  const [backgroundColor] = useState(randomColor);
  const [styleA, setStyleA] = useState<CSSProperties>();
  const [styleB, setStyleB] = useState<CSSProperties>();

  const isVertical = dir === Dir.vertical;

  const divide = useCallback<DOMAttributes<HTMLDivElement>['onClick']>(
    (e) => {
      const propA = isVertical ? 'width' : 'height';
      const propB = isVertical ? 'height' : 'width';
      const offset = isVertical ? e.nativeEvent.offsetX : e.nativeEvent.offsetY;

      setStyleA({
        [propA]: `${offset}px`,
        [propB]: '100%',
      });
      setStyleB({
        [propA]: `calc(100% - ${offset}px)`,
        [propB]: '100%',
      });

      e.stopPropagation();
    },
    [isVertical]
  );

  const reverseDir = isVertical ? Dir.horizontal : Dir.vertical;

  return (
    <div
      style={{
        ...style,
        backgroundColor,
        display: 'flex',
        flexDirection: dir === Dir.horizontal ? 'column' : undefined,
      }}
      onClick={divide}
    >
      {styleA ? <Block style={styleA} dir={reverseDir} /> : null}
      {styleB ? <Block style={styleB} dir={reverseDir} /> : null}
    </div>
  );
};

export default Block;
