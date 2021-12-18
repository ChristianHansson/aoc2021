#!/usr/bin/perl
print `clear`;
use Data::Dumper;
use Cwd 'abs_path';
sub read_file {
	open(my $f, "<" ,shift) or die();
	my $content = do { local $/; <$f> };
	close($f);
	return $content;
}
my $is_debug = $ARGV[0] ? 1 : 0;
my $file = abs_path . "/data/" . ($is_debug ? 'test_data.txt' : 'data.txt');
if (!-e $file){exit;}

my @items = split(",", read_file($file));
my $len = scalar @items;


my $least_sum;
for my $i (0..$len - 1)
{
	my $sum = traverse_to($i);
	if (!$least_sum){$least_sum = $sum;}
	elsif($sum < $least_sum){
		$least_sum = $sum;
	}
}

print Dumper $least_sum;




sub traverse_to
{
	my $i = shift;

	my $a = 0;
	my $start_num = $items[$i];
	for my $end_num (0..$len - 1){
		if ($end_num == $i){next;}

		my $b = $items[$end_num];
		my $sum = $start_num > $b ? $start_num - $b : $b - $start_num;
		$a += $sum;
	}
	return $a;
}


# 328262 == Correct answer!



1;