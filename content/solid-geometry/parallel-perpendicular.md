# 空间中的平行与垂直

## 学习目标

1. 能区分线线、线面和面面的位置关系；
2. 掌握“线线—线面—面面”之间常用的判定链；
3. 能写出条件完整、逻辑清楚的几何证明。

## 证明线面平行

要证明直线 $l$ 与平面 $\alpha$ 平行，常用方法是：

1. 在平面 $\alpha$ 内找到一条直线 $m$；
2. 证明 $l\parallel m$；
3. 说明 $l\not\subset\alpha$；
4. 根据线面平行判定定理得到 $l\parallel\alpha$。

只写“$l\parallel m$，所以 $l\parallel\alpha$”是不完整的，因为还必须说明 $m\subset\alpha$，并排除 $l$ 在平面内的情形。

## 证明线面垂直

若要证明 $l\perp\alpha$，可以在平面 $\alpha$ 内找到两条相交直线 $m,n$，并证明

$$
l\perp m,\qquad l\perp n.
$$

“两条相交直线”是关键条件；仅垂直于平面内一条直线，不能推出线面垂直。

## 常用证明链

### 平行链

中位线或平行四边形 $\Rightarrow$ 线线平行 $\Rightarrow$ 线面平行 $\Rightarrow$ 面面平行。

### 垂直链

勾股定理或等腰三角形 $\Rightarrow$ 线线垂直 $\Rightarrow$ 线面垂直 $\Rightarrow$ 面面垂直。

## L2 例题

在三棱锥 $P-ABC$ 中，$D,E$ 分别为 $PA,PB$ 的中点。证明：$DE\parallel$ 平面 $ABC$。

### 证明

在三角形 $PAB$ 中，因为 $D,E$ 分别为 $PA,PB$ 的中点，所以由中位线定理得 $DE\parallel AB$。

又因为 $AB\subset$ 平面 $ABC$，且 $DE\not\subset$ 平面 $ABC$，所以 $DE\parallel$ 平面 $ABC$。

## 易错清单

- 使用线面平行判定时，没有指出平面内的平行直线；
- 使用线面垂直判定时，平面内的两条直线没有相交；
- 把“垂直于同一直线的两条直线平行”误用于空间；
- 证明面面垂直时，没有找到一个平面内垂直于另一个平面的直线。
