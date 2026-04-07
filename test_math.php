<?php
$exprs = ["sin(90)", "cos(0)", "tan(45)", "sin(45+45)", "sin(pi)"];
foreach ($exprs as $expr) {
    echo "Original: $expr\n";
    $php_expr = preg_replace('/(sin|cos|tan)\(([^)]+)\)/i', '$1(deg2rad($2))', $expr);
    $php_expr = str_ireplace(
        ['sqrt(', 'log(', 'ln(', 'pi', 'e', '^'],
        ['sqrt(', 'log10(', 'log(', 'M_PI', 'M_E', '**'],
        $php_expr
    );
    echo "PHP Expr: $php_expr\n";
    try {
        $result = eval('return ' . $php_expr . ';');
        echo "Result: $result\n\n";
    } catch (Throwable $e) {
        echo "Error: " . $e->getMessage() . "\n\n";
    }
}
?>
