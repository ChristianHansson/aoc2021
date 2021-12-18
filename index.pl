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
my $file = abs_path . "/data/" . ($ARGV[0] ? 'test_data.txt' : 'data.txt');
if (!-e $file){exit;}

my @items = split(",", read_file($file));
my $len = scalar @items;


my $least_sum;
for my $i (0..$len - 1)
{
	# my $sum = traverse_to($i);
	# print Dumper $sum;
	last;
	if (!$least_sum){$least_sum = $sum;}
	elsif($sum < $least_sum){
		$least_sum = $sum;
	}
}
my $sum = traverse_to(5);
	print Dumper $sum;
print Dumper $least_sum;




sub traverse_to
{
	my $i = shift;

	my $a = 0;
	my $start_num = $items[$i];
	print qq^start_num: $start_num\n^;
	my $how_far_from_i = sub {
		my $f = shift;
		my $f2 = shift;
		my $f3 = 1;
		my $ft = 1;
		my $a = $f > $f2 ? $f2 : $f;
		my $b = $f > $f2 ? $f : $f2;
		for my $f4 ($a..$b){
			$ft += $f3;
			$f3 = $f3 + 1;
		}
		return $ft;
	};
	my $step_cost = 1;
	for my $end_num (0..$len - 1){
		print Dumper $end_num, $items[$end_num];
		# my $total_step_cost = $how_far_from_i->($i, $end_num);
		# print qq^$i - $end_num :: $total_step_cost\n^;
		# if ($end_num == $i){
		# 	$a += $total_step_cost;
		# 	next;
		# }

		# my $b = $items[$end_num];
		# my $sum = $start_num > $b ? $start_num - $b : $b - $start_num;
		# $a += $sum + $total_step_cost;
		last;
	}
	return $a;
}


# 328262 == Correct answer!



1;