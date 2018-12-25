### Numerical implementation of boundary conditions

#### Basics of the system
Lets consider tho slabs collision problem. Suppose slabs have areas $AB$ and $CD$ on $x$ axes:

<img src="https://user-images.githubusercontent.com/1022757/50425615-098a1a00-088c-11e9-86ef-94f645ba72bf.png" width="500">

we call $A$, $B$, $C$ and $D$ *side bars*

We mark here and following formulas in varible $v^n_i$ top index $n$ as time and $i$ as index of *inner bars* in the grid.

<img src="https://user-images.githubusercontent.com/1022757/50425859-c7fb6e00-088f-11e9-9705-7dd56e15c6e1.png" width="500">

*Bar* has always integer index $k$ and *node* has index $k\pm1/2$

For *inner bars* we will use:

for speeds:
$\begin{align}
v^{n+1/2}_{i} = v^{n-1/2}_{i} + 2 \Delta t \frac{\Sigma^n_{i+1/2} - \Sigma^n_{i-1/2}}{\phi^n_{i+1/2} + \phi^n_{i - 1/2}}
\end{align}$

for positions:
$\begin{align}
x^{n+1}_i = x^{n}_i + \Delta t v^{n+1/2}_i \\
\end{align}$

where $\Delta t$ is time step; $\phi^n_{i+1/2} = \rho^n_{i+1/2}(x^n_{i+1} - x^n_{i})$ where $\rho$ is density.

We suppose that all values of all variables are know for moment $t^n$ and before it. 





